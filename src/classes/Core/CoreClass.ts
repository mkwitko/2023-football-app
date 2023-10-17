'use client';
import { getCache, setCache } from './../../services/Cache';
import useCoreHook from './UseCoreHook';
import Crud from './../..//services/Crud';

export default class CoreClass {
    collection = '';

    crud = Crud();
    hook: any = useCoreHook();

    getCache(key?: string) {
        return getCache(key || this.collection);
    }

    setCache(value: any, shouldUpdate = false, key?: string) {
        const cache = this.getCache(key || this.collection);
        if (this.hasObject(cache) && !shouldUpdate) return;
        setCache(key || this.collection, value);
    }

    async getHttp(id: string, collection?: string) {
        const { result, error } = await this.crud.get(
            collection || this.collection,
            id
        );
        return error ? error : result;
    }

    async getRealTime(collection?: string) {
        const { result, error } = await this.crud.getRealTime(
            collection || this.collection
        );
        return error ? error : result;
    }

    async getAll(collection?: string) {
        const { result, error } = await this.crud.getAll(
            collection || this.collection
        );
        return error ? error : result;
    }

    async insert(data: any, collection?: string, customId?: string) {
        const { result, error } = await this.crud.insert(
            collection || this.collection,
            data,
            customId
        );

        return error ? error : result;
    }

    async update(data: any, collection?: string) {
        const { result, error } = await this.crud.update(
            collection || this.collection,
            data.id,
            data
        );
        return error ? error : result;
    }

    async delete(id: string, collection?: string) {
        const { result, error } = await this.crud.remove(
            collection || this.collection,
            id
        );

        return error ? error : result;
    }

    async upload(file: File, collection?: string) {
        const { result, error } = await this.crud.upload(
            collection || this.collection,
            file
        );

        return error ? error : result;
    }

    async deleteFile(name: string, collection?: string) {
        const { result, error } = await this.crud.deleteFile(
            collection || this.collection,
            name
        );

        return error ? error : result;
    }

    async setClass(shouldUpdate = true, collection?: string) {
        const cache = this.getCache();
        if (!this.hasObject(cache) || shouldUpdate) {
            const response = await this.getAll(collection || this.collection);
            this.setCache(response, shouldUpdate, this.collection);
            return response;
        } else {
            return cache;
        }
    }

    hasObject(data: any) {
        return Object.keys(data).length > 0;
    }
}
