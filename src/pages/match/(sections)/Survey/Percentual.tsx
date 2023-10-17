import React from 'react'

export default function Percentual({
    highest,
    width,
    e,
}: {
    highest: boolean;
    width: number;
    e: any;
}) {
    return (
        <div className="relative">
            <div
                className={`${highest ? 'bg-primary' : 'bg-primary-100 text-primary-900'
                    } h-8 rounded-[0.625rem]`}
                style={{
                    width: `${width}%`,
                }}
            ></div>
            <span
                className={`
      ${highest
                        ? width > 70
                            ? 'text-white'
                            : 'text-primary-900'
                        : 'text-primary-900'
                    }
       absolute leading-8 top-0 w-full text-center font-bold `}
            >
                {e.value} - {+width.toFixed(0)}%
            </span>
        </div>
    )
}
