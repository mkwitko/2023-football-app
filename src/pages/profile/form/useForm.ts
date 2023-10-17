import React, { useContext, useEffect } from 'react';
import { Form, Schema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Context } from '../../../context/Context';

export default function ProfileForm({setEdit}: any) {
    const { user } = useContext(Context);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting, isValid },
    } = useForm<Form>({
        resolver: zodResolver(Schema),
        defaultValues: {
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
    }, [user.hook.data])

    const submit = async ({
        username,
        youtubeEmail,
        cpf,
        cellphone,
    }: Form) => {
        await user.update({
            id: user?.hook?.data?.id || '',
            name: username,
            youtubeEmail,
            cpf,
            cellphone,
        }).then(() => {
            user.setClassById(true, user?.hook?.data?.id).then((res) => {
                user.hook.setData(res);
                setEdit(false);
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
    };
}
