

export interface INames {
    name: string
}

export enum NameActionConstants {
    GET_NAMES='GET_NAMES'
}

interface Get_Names {
    type: NameActionConstants.GET_NAMES,
    payload: INames[]
}

export type NameActionTypes = Get_Names