import { HttpClient, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Photo } from '../shared/photo-gallery/photo';
import { PortfolioSearchParams, PortfolioService } from './portfolio.service';

// https://github.com/jsanahuja/InstagramFeed/blob/master/src/InstagramFeed.js
interface RequestOptions extends PortfolioSearchParams {
    username?: string;
    tag?: string;
    userId?: string;
    location?: string;
    offset: number;
    limit: number;
}

@Injectable({ providedIn: 'root' })
export class InstagramPortfolioService implements PortfolioService {

    constructor(private httpClient: HttpClient) { }

    get(searchParams: PortfolioSearchParams): Observable<Photo[]> {
        // const abmParams = { userId: 'abmorrisart' }; // "17841405564792002" // 5536017493
        const abmParams = { username: 'abmorrisart' };
        const igSearchParams = Object.assign(Object.assign({}, searchParams), abmParams);
        const req = this.buildRequest(igSearchParams);

        return req.pipe(
            map(res => {
                let dataStr = res.split('window._sharedData = ')[1].split('<\/script>')[0];

                // contains extra ';' at the end of the data.
                if (dataStr && dataStr.endsWith(';')) {
                    dataStr = dataStr.substr(0, dataStr.length - 1);
                }

                const data = JSON.parse(dataStr);
                const profile = data.entry_data?.ProfilePage || data.entry_data?.TagPage || data.entry_data?.LocationsPage;

                if (!profile) {
                    return [];
                }

                const user = profile[0].graphql.user;

                // console.log(user);

                const edges = user.edge_owner_to_timeline_media.edges;
                const imgs: Photo[] = [];

                edges.forEach((edge: any) => {
                    const caption: string = edge.node?.edge_media_to_caption?.edges[0]?.node?.text;
                    const allowedTags = ['#portrait', '#procreate', '#portfolio', '#artportfolio', '#illustration', '#sketchbook', '#painting', '#acrylic', '#drawing', '#watercolor', '#ink'];

                    if (!(allowedTags.findIndex(tag => caption.indexOf(tag) > -1) > -1)) {
                        return;
                    }

                    edge?.node?.edge_sidecar_to_children?.edges?.forEach((childEdge: any) => {
                        if (childEdge?.node?.is_video === true) {
                            return;
                        }

                        const img: Photo = {
                            original: childEdge.node.display_url,
                            small: childEdge.node.display_url,
                            medium: childEdge.node.display_url,
                            large: childEdge.node.display_url,
                            title: '',
                            description: '',
                        };

                        imgs.push(img);
                    });
                });

                return imgs;
            }));
    }

    private buildRequest(options: RequestOptions): Observable<string> {

        if (!options.username && !options.tag && !options.userId && !options.location) {
            throw new Error('Instagram Feed: Error, no username, tag or user_id defined.');
        }

        const host = 'https://www.instagram.com/';
        let instaUrl = '';

        if (options.username) {
            instaUrl = host + options.username + '/';
        } else if (options.tag) {
            instaUrl = host + 'explore/tags/' + options.tag + '/';
        } else if (options.location) {
            instaUrl = host + 'explore/locations/' + options.location + '/';
        } else if (options.userId) {
            instaUrl = host
                + 'graphql/query/?query_id=17888483320059182&variables={"id":"' + options.userId + '","first":' + options.limit + ',"after":null}';
        } else {
            throw new Error('unhandled condition.');
        }

        const cdnNum = ~~(Math.random() * 3333); // tslint:disable-line: no-bitwise
        const baseUrl = `https://images${cdnNum}-focus-opensocial.googleusercontent.com/gadgets/proxy?container=none&url=${instaUrl}`;

        return this.httpClient.get(baseUrl, { responseType: 'text' }, );
    }
}
