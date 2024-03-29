import { Context } from 'src/context/Context'
import { User } from 'lucide-react'
import { ComponentProps, useContext, useEffect, useId, useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface AvatarProps extends ComponentProps<'input'> {
  setImagePreview: (previewUrl: File | string) => void
  imagePreview?: string | null
  errorMessage?: string | null | undefined
  disabled?: boolean
  register?: UseFormRegisterReturn<string>
  setValue: any
}

export function Avatar({
  setImagePreview,
  errorMessage = null,
  imagePreview = null,
  register,
  disabled = false,
  setValue,
  ...props
}: AvatarProps) {
  const customId = useId()
  const [file, setFile] = useState<string | null>(imagePreview || null)

  const { user } = useContext(Context)

  function createPreviewUrl(filelist: FileList | null) {
    if (!filelist) return

    if (filelist[0] && typeof filelist[0] !== 'string') {
      const previewUrl = filelist[0]
      const reader = new FileReader()

      reader.onload = () => {
        setFile(reader.result as string)
      }

      setImagePreview(filelist[0])
      reader.readAsDataURL(previewUrl)
    }
  }

  useEffect(() => {
    if (user.hook.data && user.hook.data.avatar) setFile(user.hook.data.avatar)
  }, [user.hook.data])

  return (
    <>
      <label
        data-preview={!!file}
        className="group relative mx-auto flex aspect-square h-[180px] cursor-pointer items-center justify-center overflow-hidden rounded-full border border-zinc-300 shadow-sm md:h-[200px]"
        htmlFor={customId}
      >
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center group-data-[preview=true]:opacity-0 group-data-[preview=true]:hover:opacity-100">
          <User
            className="stroke-zinc-500 group-data-[preview=true]:stroke-zinc-50"
            size={102}
            strokeWidth={0.5}
          />
        </div>

        {file && (
          <img
            src={file}
            className="absolute inset-0 z-10 rounded-lg object-cover duration-300 group-hover:brightness-50"
            alt=""
          />
        )}

        <input
          type="file"
          className="sr-only"
          onChange={(event) => {
            createPreviewUrl(event.target.files)
            setValue('avatarChanged', true)
          }}
          disabled={disabled}
          {...register}
          {...props}
          id={customId}
        />
      </label>

      {errorMessage && (
        <p className="text-xs font-bold text-center text-red-400 mt-2">
          {errorMessage}
        </p>
      )}
    </>
  )
}
