import type { ComponentProps, HTMLAttributes } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export type MessageProps = HTMLAttributes<HTMLDivElement> & {
  from: "user" | "assistant"
}

export const Message = ({ className, from, ...props }: MessageProps) => (
  <div
    className={cn(
      "group flex w-full items-end justify-end gap-2 py-4",
      from === "user" ? "is-user" : "is-assistant flex-row-reverse justify-end",
      className
    )}
    {...props}
  />
)

const messageContentVariants = cva(
  "is-user:dark flex flex-col gap-2 overflow-hidden rounded-lg text-sm",
  {
    variants: {
      variant: {
        contained: [
          "max-w-[80%] px-4 py-3",
          "group-[.is-user]:bg-oklch(0.21 0.006 285.885) group-[.is-user]:text-oklch(0.985 0 0) dark:group-[.is-user]:bg-oklch(0.92 0.004 286.32) dark:group-[.is-user]:text-oklch(0.21 0.006 285.885)",
          "group-[.is-assistant]:bg-oklch(0.967 0.001 286.375) group-[.is-assistant]:text-oklch(0.141 0.005 285.823) dark:group-[.is-assistant]:bg-oklch(0.274 0.006 286.033) dark:group-[.is-assistant]:text-oklch(0.985 0 0)",
        ],
        flat: [
          "group-[.is-user]:max-w-[80%] group-[.is-user]:bg-oklch(0.967 0.001 286.375) group-[.is-user]:px-4 group-[.is-user]:py-3 group-[.is-user]:text-oklch(0.141 0.005 285.823) dark:group-[.is-user]:bg-oklch(0.274 0.006 286.033) dark:group-[.is-user]:text-oklch(0.985 0 0)",
          "group-[.is-assistant]:text-oklch(0.141 0.005 285.823) dark:group-[.is-assistant]:text-oklch(0.985 0 0)",
        ],
      },
    },
    defaultVariants: {
      variant: "contained",
    },
  }
)

export type MessageContentProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof messageContentVariants>

export const MessageContent = ({
  children,
  className,
  variant,
  ...props
}: MessageContentProps) => (
  <div
    className={cn(messageContentVariants({ variant, className }))}
    {...props}
  >
    {children}
  </div>
)

export type MessageAvatarProps = ComponentProps<typeof Avatar> & {
  src: string
  name?: string
}

export const MessageAvatar = ({
  src,
  name,
  className,
  ...props
}: MessageAvatarProps) => (
  <Avatar className={cn("ring-oklch(0.92 0.004 286.32) size-8 ring-1 dark:ring-oklch(1 0 0 / 10%)", className)} {...props}>
    <AvatarImage alt="" className="mt-0 mb-0" src={src} />
    <AvatarFallback>{name?.slice(0, 2) || "ME"}</AvatarFallback>
  </Avatar>
)
