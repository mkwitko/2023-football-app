import React from 'react'

export default function ValuePicker({componentProps}: any) {
    return (
        <div className='flex flex-col p-4 rounded-[0.625rem] justify-between h-full'>
            <p>Insira o valor que deseja enviar</p>
            <input type="number" step="0.5" />
            <div className='flex gap-8 items-center justify-between w-full'>
                <button type='button'>Cancelar</button>
                <button type='button'>Confirmar</button>
            </div>
        </div>
    )
}
