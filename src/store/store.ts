import {IQuatable} from "../models/IQuatable.ts";
import {makeAutoObservable} from "mobx";
import QuatableService from "../service/QuatableService.ts";
export default class store {
    quatable: IQuatable[] = []
    quatableByTag: IQuatable[] = []
    LikedQuatables: IQuatable[] = []
    constructor() {
        makeAutoObservable(this)
    }

    setQuatable(quatable: IQuatable[]) {
        this.quatable = quatable
    }

    setQuatableByTag(quatable: IQuatable[]) {
        this.quatableByTag = quatable
    }

    setLikedQuatables(likedQuatables: IQuatable[]) {
        this.LikedQuatables = likedQuatables
    }

    async getQuatable() {
        try {
            const quatable = await QuatableService.getFamousQuatable()
            console.log(quatable)
            const quatableWithCategory = quatable.data.map((item: IQuatable) => ({
                ...item,
                isLiked: false, // по умолчанию не лайкнуто
            }));

            localStorage.setItem('quatable', JSON.stringify(quatableWithCategory));
            this.setQuatable(quatableWithCategory);
        } catch (e) {
            console.log(e);
        }
    }

    async getQuatableByTag(tag: string) {
        try {
            const quatable = await QuatableService.getQuatableByTag(tag)
            this.setQuatableByTag(quatable.data.results)
        } catch (e) {
            console.log(e);
        }
    }


    async postLike(_id: string) {
        try {
            const index = this.quatable.findIndex(item => item._id === _id);
            if (index !== -1) {
                // меняем на противоположное значение
                this.quatable[index].isLiked = !this.quatable[index].isLiked;

                // обновляем массив в локальном хранилище
                localStorage.setItem('quatable', JSON.stringify(this.quatable));
            }
        } catch (e) {
            console.log(e);
        }
    }
}