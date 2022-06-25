/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Article {
    id?: number;
    featured?: boolean;
    title?: string;
    url?: string;
    imageUrl?: string;
    newsSite?: string;
    summary?: string;
    publishedAt?: string;
    launches?: { id: string; provider?: string }[];
    events?: { id: string; provider?: string }[];
}

export interface NewArticle {
    featured?: boolean;
    title: string;
    url: string;
    imageUrl: string;
    newsSite: string;
    summary?: string;
    publishedAt: string;
    launches?: { id: string; provider?: string }[];
    events?: { id: number; provider?: string }[];
}

export interface Blog {
    id?: number;
    title?: string;
    url?: string;
    imageUrl?: string;
    newsSite?: string;
    summary?: string;
    publishedAt?: string;
    launches?: { id: string; provider?: string }[];
    events?: { id: string; provider?: string }[];
}

export interface NewBlog {
    featured?: boolean;
    title: string;
    url: string;
    imageUrl: string;
    newsSite: string;
    summary?: string;
    publishedAt: string;
    launches?: { id: string; provider?: string }[];
    events?: { id: number; provider?: string }[];
}

export interface Report {
    id?: number;
    title?: string;
    url?: string;
    imageUrl?: string;
    newsSite?: string;
    summary?: string;
    publishedAt?: string;
}

export interface NewReport {
    title: string;
    url: string;
    imageUrl: string;
    newsSite: string;
    summary?: string;
    publishedAt: string;
}

export interface Error {
    /** @format int32 */
    code: number;
    message: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
    /** set parameter to `true` for call `securityWorker` for this request */
    secure?: boolean;
    /** request path */
    path: string;
    /** content type of request body */
    type?: ContentType;
    /** query params */
    query?: QueryParamsType;
    /** format of response (i.e. response.json() -> format: "json") */
    format?: ResponseFormat;
    /** request body */
    body?: unknown;
    /** base url */
    baseUrl?: string;
    /** request cancellation token */
    cancelToken?: CancelToken;
}

export type RequestParams = Omit<
    FullRequestParams,
    "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
    baseUrl?: string;
    baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
    securityWorker?: (
        securityData: SecurityDataType | null
    ) => Promise<RequestParams | void> | RequestParams | void;
    customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
    extends Response {
    data: D;
    error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
    Json = "application/json",
    FormData = "multipart/form-data",
    UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
    public baseUrl: string = "https://api.spaceflightnewsapi.net/v3";
    private securityData: SecurityDataType | null = null;
    private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
    private abortControllers = new Map<CancelToken, AbortController>();
    private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
        fetch(...fetchParams);

    private baseApiParams: RequestParams = {
        credentials: "same-origin",
        headers: {},
        redirect: "follow",
        referrerPolicy: "no-referrer",
    };

    constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
        Object.assign(this, apiConfig);
    }

    public setSecurityData = (data: SecurityDataType | null) => {
        this.securityData = data;
    };

    private encodeQueryParam(key: string, value: any) {
        const encodedKey = encodeURIComponent(key);
        return `${encodedKey}=${encodeURIComponent(
            typeof value === "number" ? value : `${value}`
        )}`;
    }

    private addQueryParam(query: QueryParamsType, key: string) {
        return this.encodeQueryParam(key, query[key]);
    }

    private addArrayQueryParam(query: QueryParamsType, key: string) {
        const value = query[key];
        return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
    }

    protected toQueryString(rawQuery?: QueryParamsType): string {
        const query = rawQuery || {};
        const keys = Object.keys(query).filter(
            (key) => "undefined" !== typeof query[key]
        );
        return keys
            .map((key) =>
                Array.isArray(query[key])
                    ? this.addArrayQueryParam(query, key)
                    : this.addQueryParam(query, key)
            )
            .join("&");
    }

    protected addQueryParams(rawQuery?: QueryParamsType): string {
        const queryString = this.toQueryString(rawQuery);
        return queryString ? `?${queryString}` : "";
    }

    private contentFormatters: Record<ContentType, (input: any) => any> = {
        [ContentType.Json]: (input: any) =>
            input !== null &&
            (typeof input === "object" || typeof input === "string")
                ? JSON.stringify(input)
                : input,
        [ContentType.FormData]: (input: any) =>
            Object.keys(input || {}).reduce((formData, key) => {
                const property = input[key];
                formData.append(
                    key,
                    property instanceof Blob
                        ? property
                        : typeof property === "object" && property !== null
                        ? JSON.stringify(property)
                        : `${property}`
                );
                return formData;
            }, new FormData()),
        [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
    };

    private mergeRequestParams(
        params1: RequestParams,
        params2?: RequestParams
    ): RequestParams {
        return {
            ...this.baseApiParams,
            ...params1,
            ...(params2 || {}),
            headers: {
                ...(this.baseApiParams.headers || {}),
                ...(params1.headers || {}),
                ...((params2 && params2.headers) || {}),
            },
        };
    }

    private createAbortSignal = (
        cancelToken: CancelToken
    ): AbortSignal | undefined => {
        if (this.abortControllers.has(cancelToken)) {
            const abortController = this.abortControllers.get(cancelToken);
            if (abortController) {
                return abortController.signal;
            }
            return void 0;
        }

        const abortController = new AbortController();
        this.abortControllers.set(cancelToken, abortController);
        return abortController.signal;
    };

    public abortRequest = (cancelToken: CancelToken) => {
        const abortController = this.abortControllers.get(cancelToken);

        if (abortController) {
            abortController.abort();
            this.abortControllers.delete(cancelToken);
        }
    };

    public request = async <T = any, E = any>({
        body,
        secure,
        path,
        type,
        query,
        format,
        baseUrl,
        cancelToken,
        ...params
    }: FullRequestParams): Promise<HttpResponse<T, E>> => {
        const secureParams =
            ((typeof secure === "boolean"
                ? secure
                : this.baseApiParams.secure) &&
                this.securityWorker &&
                (await this.securityWorker(this.securityData))) ||
            {};
        const requestParams = this.mergeRequestParams(params, secureParams);
        const queryString = query && this.toQueryString(query);
        const payloadFormatter =
            this.contentFormatters[type || ContentType.Json];
        const responseFormat = format || requestParams.format;

        return this.customFetch(
            `${baseUrl || this.baseUrl || ""}${path}${
                queryString ? `?${queryString}` : ""
            }`,
            {
                ...requestParams,
                headers: {
                    ...(type && type !== ContentType.FormData
                        ? { "Content-Type": type }
                        : {}),
                    ...(requestParams.headers || {}),
                },
                signal: cancelToken
                    ? this.createAbortSignal(cancelToken)
                    : void 0,
                body:
                    typeof body === "undefined" || body === null
                        ? null
                        : payloadFormatter(body),
            }
        ).then(async (response) => {
            const r = response as HttpResponse<T, E>;
            r.data = null as unknown as T;
            r.error = null as unknown as E;

            const data = !responseFormat
                ? r
                : await response[responseFormat]()
                      .then((data) => {
                          if (r.ok) {
                              r.data = data;
                          } else {
                              r.error = data;
                          }
                          return r;
                      })
                      .catch((e) => {
                          r.error = e;
                          return r;
                      });

            if (cancelToken) {
                this.abortControllers.delete(cancelToken);
            }

            if (!response.ok) throw data;
            return data;
        });
    };
}

/**
 * @title Spaceflight News API
 * @version 3.4.0
 * @license GPLv3 (https://www.gnu.org/licenses/gpl-3.0.en.html)
 * @termsOfService https://spaceflightnewsapi.net
 * @baseUrl https://api.spaceflightnewsapi.net/v3
 * @externalDocs https://thespacedevs.com
 * @contact Spaceflight News API <derk@spaceflightnewsapi.net> (https://spaceflightnewsapi.net)
 *
 * Documentation for the Spaceflight News API. Join The Space Devs Discord server to contact me for support :)  NOTE: to use filters like `_contains`, specify the field you want to filter. For example: `title_contains=nasa`. This can not be done in this Swagger interface. [More info and examples](https://strapi.io/documentation/developer-docs/latest/developer-resources/content-api/content-api.html#filters).
 */
export class Api<
    SecurityDataType extends unknown
> extends HttpClient<SecurityDataType> {
    articles = {
        /**
         * No description
         *
         * @tags Article
         * @name CountList
         * @request GET:/articles/count
         * @secure
         */
        countList: (params: RequestParams = {}) =>
            this.request<{ count?: number }, Error>({
                path: `/articles/count`,
                method: "GET",
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Article
         * @name ArticlesList
         * @request GET:/articles
         * @secure
         */
        articlesList: (
            query?: {
                [key: string]: string | number | string[] | undefined;
                _limit?: number;
                _sort?: string;
                _start?: number;
                "="?: string;
                _ne?: string;
                _lt?: string;
                _lte?: string;
                _gt?: string;
                _gte?: string;
                _contains?: string;
                _containss?: string;
                _in?: string[];
                _nin?: string[];
            },
            params: RequestParams = {}
        ) =>
            this.request<Article[], Error>({
                path: `/articles`,
                method: "GET",
                query: query,
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Article
         * @name ArticlesDetail
         * @request GET:/articles/{id}
         * @secure
         */
        articlesDetail: (id: string, params: RequestParams = {}) =>
            this.request<Article, Error>({
                path: `/articles/${id}`,
                method: "GET",
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * @description Get all articles linked to a launch
         *
         * @tags Article
         * @name LaunchDetail
         * @request GET:/articles/launch/{id}
         * @secure
         */
        launchDetail: (id: string, params: RequestParams = {}) =>
            this.request<{ foo?: string }, Error>({
                path: `/articles/launch/${id}`,
                method: "GET",
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * @description Get all articles linked to an event
         *
         * @tags Article
         * @name EventDetail
         * @request GET:/articles/event/{id}
         * @secure
         */
        eventDetail: (id: string, params: RequestParams = {}) =>
            this.request<{ foo?: string }, Error>({
                path: `/articles/event/${id}`,
                method: "GET",
                secure: true,
                format: "json",
                ...params,
            }),
    };
    blogs = {
        /**
         * No description
         *
         * @tags Blog
         * @name CountList
         * @request GET:/blogs/count
         * @secure
         */
        countList: (params: RequestParams = {}) =>
            this.request<{ count?: number }, Error>({
                path: `/blogs/count`,
                method: "GET",
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Blog
         * @name BlogsList
         * @request GET:/blogs
         * @secure
         */
        blogsList: (
            query?: {
                _limit?: number;
                _sort?: string;
                _start?: number;
                "="?: string;
                _ne?: string;
                _lt?: string;
                _lte?: string;
                _gt?: string;
                _gte?: string;
                _contains?: string;
                _containss?: string;
                _in?: string[];
                _nin?: string[];
            },
            params: RequestParams = {}
        ) =>
            this.request<Blog[], Error>({
                path: `/blogs`,
                method: "GET",
                query: query,
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Blog
         * @name BlogsDetail
         * @request GET:/blogs/{id}
         * @secure
         */
        blogsDetail: (id: string, params: RequestParams = {}) =>
            this.request<Blog, Error>({
                path: `/blogs/${id}`,
                method: "GET",
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * @description Get all blogs linked to a launch
         *
         * @tags Blog
         * @name LaunchDetail
         * @request GET:/blogs/launch/{id}
         * @secure
         */
        launchDetail: (id: string, params: RequestParams = {}) =>
            this.request<{ foo?: string }, Error>({
                path: `/blogs/launch/${id}`,
                method: "GET",
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * @description Get all blogs linked to an event
         *
         * @tags Blog
         * @name EventDetail
         * @request GET:/blogs/event/{id}
         * @secure
         */
        eventDetail: (id: string, params: RequestParams = {}) =>
            this.request<{ foo?: string }, Error>({
                path: `/blogs/event/${id}`,
                method: "GET",
                secure: true,
                format: "json",
                ...params,
            }),
    };
    info = {
        /**
         * @description Endpoint to retrieve infomation about various aspects of the API.
         *
         * @tags Info
         * @name InfoList
         * @request GET:/info
         * @secure
         */
        infoList: (params: RequestParams = {}) =>
            this.request<{ version?: string; newsSites?: string[] }, Error>({
                path: `/info`,
                method: "GET",
                secure: true,
                format: "json",
                ...params,
            }),
    };
    reports = {
        /**
         * No description
         *
         * @tags Report
         * @name CountList
         * @request GET:/reports/count
         * @secure
         */
        countList: (params: RequestParams = {}) =>
            this.request<{ count?: number }, Error>({
                path: `/reports/count`,
                method: "GET",
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Report
         * @name ReportsList
         * @request GET:/reports
         * @secure
         */
        reportsList: (
            query?: {
                _limit?: number;
                _sort?: string;
                _start?: number;
                "="?: string;
                _ne?: string;
                _lt?: string;
                _lte?: string;
                _gt?: string;
                _gte?: string;
                _contains?: string;
                _containss?: string;
                _in?: string[];
                _nin?: string[];
            },
            params: RequestParams = {}
        ) =>
            this.request<Report[], Error>({
                path: `/reports`,
                method: "GET",
                query: query,
                secure: true,
                format: "json",
                ...params,
            }),

        /**
         * No description
         *
         * @tags Report
         * @name ReportsDetail
         * @request GET:/reports/{id}
         * @secure
         */
        reportsDetail: (id: string, params: RequestParams = {}) =>
            this.request<Report, Error>({
                path: `/reports/${id}`,
                method: "GET",
                secure: true,
                format: "json",
                ...params,
            }),
    };
}
