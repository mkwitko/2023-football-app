import React, { useContext, useEffect } from 'react';
import { Form, Schema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Context } from '../../../context/Context';

export default function ProfileForm({ setEdit }: any) {
    const { user } = useContext(Context)
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting, isValid },
    } = useForm<Form>({
        resolver: zodResolver(Schema),
        defaultValues: {
            avatar: user?.hook?.data?.avatar || '',
            avatarChanged: false,
            username: user?.hook?.data?.username || '',
            email: user?.hook?.data?.email || '',
            youtubeEmail: user?.hook?.data?.youtubeEmail || '',
            cpf: user?.hook?.data?.cpf || '',
            cellphone: user?.hook?.data?.cellphone || '',
        },
    });

    useEffect(() => {
        setValue('username', user?.hook?.data?.username || '');
        setValue('email', user?.hook?.data?.email || '');
        setValue('youtubeEmail', user?.hook?.data?.youtubeEmail || '');
        setValue('cpf', user?.hook?.data?.cpf || '');
        setValue('cellphone', user?.hook?.data?.cellphone || '');
        setValue('avatar', user?.hook?.data?.avatar || '')
    }, [user.hook.data])

    const submit = async ({
        username,
        youtubeEmail,
        cpf,
        cellphone,
        avatar,
        avatarChanged,
        access_token
    }: Form) => {
        let imagePath = '';

        let data: any = {
            id: user?.hook?.data?.id || '',
            name: username,
            youtubeEmail,
            cpf,
            cellphone,
            access_token
        }
        if (avatarChanged) {
            console.log('entered');
            if(user.hook.data.fileName) {
                user.deleteFile(user.hook.data.fileName);
            }
            await user.upload(avatar, 'users/' + user.hook.data.id).then((res: any) => {
                imagePath = res
            })

            data = {
                ...data,
                avatar: imagePath,
                fileName:  user.hook.data.id + '/' + avatar.name
            }
        }

       
        await user.update(data).then(() => {
            user.setClassById(true, user?.hook?.data?.id).then((res) => {
                user.hook.setData(res);
                setEdit(false);
                setValue('avatarChanged', false);
            });
        })
    };

    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        isValid,
        submit,
        setValue,
        watch
    };
}
