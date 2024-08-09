import {Book} from "@/shared/common-types";

export const setDefaultBookData = (): Book => {
    return {
        title: '',
        author: '',
        description: '',
        year: null
    };
};