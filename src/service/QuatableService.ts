import {AxiosResponse} from "axios";
import $api from "../http";
import {IQuatable} from "../models/IQuatable.ts";
import {IQuatableByTags} from "../models/response/QuatableByTags.ts";
export default class QuatableService {

    static async getFamousQuatable(): Promise<AxiosResponse<IQuatable[]>> {
        return $api.get<IQuatable[]>('/quotes/random?limit=30');
    }
    static async getQuatableByTag(tag: string): Promise<AxiosResponse<IQuatableByTags>> {
        return $api.get<IQuatableByTags>(`/quotes?tags=${tag}`);
    }
}
