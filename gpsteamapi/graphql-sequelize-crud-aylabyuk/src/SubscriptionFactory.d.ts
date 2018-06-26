/// <reference path="../../../graphql-sequelize-crud/src/@types/graphql-sequelize/index.d.ts" />
import { Model } from "./types";
import { GraphQLFieldConfigMap, GraphQLFieldConfig, GraphQLObjectType } from 'graphql';
import { PubSub } from 'graphql-subscriptions';
export declare class SubscriptionFactory {
    private pubsub;
    constructor(config: SubscriptionFactoryConfig);
    created({subscriptions, model, modelType}: {
        model: Model;
        modelType: GraphQLObjectType;
        subscriptions: Subscriptions;
    }): void;
    updated({subscriptions, model, modelType}: {
        model: Model;
        modelType: GraphQLObjectType;
        subscriptions: Subscriptions;
    }): void;
    deleted({subscriptions, model, idOnlyType}: {
        model: Model;
        idOnlyType: GraphQLObjectType;
        subscriptions: Subscriptions;
    }): void;
}
export interface SubscriptionFactoryConfig {
    pubsub: PubSub;
}
export interface Subscriptions extends GraphQLFieldConfigMap<any, any> {
    [subscriptionName: string]: GraphQLFieldConfig<any, any>;
}
