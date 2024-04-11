import {IQuatable} from "../models/IQuatable.ts";
import {makeAutoObservable} from "mobx";
import QuatableService from "../service/QuatableService.ts";
import {ITagsQuatable} from "../models/IQuatableWithTags.ts";
import {ITags} from "../models/ITags.ts";

export default class store {
    quatable: IQuatable[] = [] // массив цитат под главную страницу
    quatableByTag = {} as ITagsQuatable // массив цитат по категориям
    tags: ITags[] = [] // массив со всеми тэгами/категориями
    constructor() {
        makeAutoObservable(this)
    }

    setQuatable(quatable: IQuatable[]) {
        this.quatable = quatable
    }

    setQuatableByTag(tag: string , quatables: IQuatable[]) {
        if (!tag) return;
        this.quatableByTag[tag] = quatables;
    }
    setTags(tags: ITags[]){
        this.tags = tags
    }

    async getQuatable() {
        try {
            const response = await QuatableService.getRandomQuatable()
            const quatable = response.data
            localStorage.setItem('quatable', JSON.stringify(quatable));
            this.setQuatable(quatable);
        } catch (e) {
            console.log(e);
        }
    }

    async getQuatableByTag(tag: string) {
        if (!tag) return;
        try {
            const response = await QuatableService.getQuatableByTag(tag);
            const quatables = response.data.results;
            this.setQuatableByTag(tag, quatables);
            localStorage.setItem(`quatableWithTags_${tag}`, JSON.stringify(quatables));
        } catch (e) {
            console.log(e);
        }
    }

    async postLike(_id: string) {
        try {
            // Обновление для общего списка цитат
            const indexInQuatable = this.quatable.findIndex(item => item._id === _id);
            if (indexInQuatable !== -1) {
                this.quatable[indexInQuatable].isLiked = !this.quatable[indexInQuatable].isLiked;
                localStorage.setItem('quatable', JSON.stringify(this.quatable));
            }
            // Обновление для цитат по тегам
            Object.keys(this.quatableByTag).forEach(tag => {
                const indexInTag = this.quatableByTag[tag].findIndex(item => item._id === _id);
                if (indexInTag !== -1) {
                    this.quatableByTag[tag][indexInTag].isLiked = !this.quatableByTag[tag][indexInTag].isLiked;
                    // Обновляем данные в localStorage для этого тега
                    localStorage.setItem(`quatableWithTags_${tag}`, JSON.stringify(this.quatableByTag[tag]));
                }
            });
        } catch (e) {
            console.log(e);
        }
    }
    async getTags(){
        const response =  await QuatableService.getTags()
        this.setTags(response.data)
        localStorage.setItem('tags',JSON.stringify(this.tags))
    }
}