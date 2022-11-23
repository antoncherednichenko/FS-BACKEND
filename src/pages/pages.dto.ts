import { IFeature } from "./types"

export class CreatePagesDto {
    readonly name: string
    readonly features: IFeature[]
}