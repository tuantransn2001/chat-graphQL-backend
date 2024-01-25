import { ObjectType } from "@nestjs/graphql";
import { UserTyping } from "./user-typing.type";

@ObjectType()
export class UserStoppedTyping extends UserTyping {}
