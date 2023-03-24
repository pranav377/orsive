import { create } from 'zustand';

type LikeState = {
    data: Array<{
        postId: string;
        type: 'like' | 'dislike' | 'nope' | undefined;
        likes: number;
    }>;
};

interface LikeActions {
    setLike: (payload: {
        postId: string;
        type: 'like' | 'dislike' | 'nope';
        likes: number;
    }) => void;
    resetLike: () => void;
}

const initialState: LikeState = {
    data: [],
};

export const useLikeState = create<LikeState & LikeActions>((set, get) => ({
    ...initialState,
    setLike: (payload) => {
        const state = get().data;
        set({
            data: [
                ...state.filter((value) => value.postId !== payload.postId),
                { ...payload },
            ],
        });
    },
    resetLike: () => {
        set(initialState);
    },
}));
