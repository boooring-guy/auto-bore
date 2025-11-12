"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import z from "zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  CopyIcon,
  FileJsonIcon,
  Globe2Icon,
  PencilIcon,
  PencilLineIcon,
  SendHorizonalIcon,
  SendIcon,
  TextWrapIcon,
  TrashIcon,
} from "lucide-react"
import { toast } from "sonner"
import React from "react"

const METHODS: {
  value: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  label: string
  icon: React.ElementType
}[] = [
  {
    value: "GET",
    label: "GET",
    icon: Globe2Icon,
  },
  {
    value: "POST",
    label: "POST",
    icon: SendIcon,
  },
  {
    value: "PUT",
    label: "PUT",
    icon: PencilIcon,
  },
  {
    value: "DELETE",
    label: "DELETE",
    icon: TrashIcon,
  },
  {
    value: "PATCH",
    label: "PATCH",
    icon: PencilLineIcon,
  },
]

interface HttpRequestDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (values: z.infer<typeof HttpRequestFormSchema>) => void
  defaultEndPoint?: string
  defaultMethod?:
    | "GET"
    | "POST"
    | "PUT"
    | "DELETE"
    | "PATCH"
    | "OPTIONS"
    | "HEAD"
  defaultBody?: string
}

export const HttpRequestFormSchema = z.object({
  endpoint: z.url("Please enter a valid URL"),
  method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"]),
  body: z.string().optional(),
  // .refine()TODO: add a json schema validator
})

export type HttpRequestFormType = z.infer<typeof HttpRequestFormSchema>

export const HttpRequestDialog = ({
  open,
  onOpenChange,
  onSubmit = () => {},
  // optimize the default values to be the node data
  defaultEndPoint,
  defaultMethod = "POST" as const,
  defaultBody,
}: HttpRequestDialogProps) => {
  const form = useForm<HttpRequestFormType>({
    resolver: zodResolver(HttpRequestFormSchema),
    defaultValues: {
      endpoint: defaultEndPoint || "",
      method: defaultMethod,
      body: defaultBody || "",
    },
  })

  React.useEffect(() => {
    // resets on reopen
    if (open) {
      form.reset({
        endpoint: defaultEndPoint || "",
        method: defaultMethod,
        body: defaultBody || "",
      })
    }
  }, [open, defaultEndPoint, defaultMethod, defaultBody, form])

  const watchMethod = form.watch("method")
  const showBody = ["POST", "PUT", "PATCH"].includes(watchMethod)

  const handleSubmit = (values: HttpRequestFormType) => {
    onSubmit(values)
    onOpenChange(false) // to close the dialog
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>HTTP Request</DialogTitle>
          <DialogDescription>
            Make an HTTP request to an external API.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8 mt-4"
          >
            <FormField
              control={form.control}
              name="method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endpoint</FormLabel>
                  <InputGroup>
                    {/* Select the method */}
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="font-medium">
                        {METHODS.map((method) => (
                          <SelectItem key={method.value} value={method.value}>
                            <div className="flex items-center gap-2">
                              <method.icon className="w-4 h-4" />
                              {method.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </InputGroup>
                  <FormDescription>
                    Select the HTTP method to use for the request.
                  </FormDescription>
                  <FormMessage />{" "}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endpoint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endpoint</FormLabel>
                  <InputGroup>
                    <FormControl>
                      <InputGroupInput
                        {...field}
                        placeholder="https://api.example.com/users/{{httpResponse.data.id}}"
                        className="w-full"
                      />
                    </FormControl>
                  </InputGroup>
                  <FormDescription>
                    Static URL or use{" "}
                    <span className="inline font-mono bg-accent px-px">
                      {"{{variables}}"}
                    </span>{" "}
                    to reference variables for simple variable substitution or
                    use{" "}
                    <span className="inline font-mono bg-accent px-px">
                      {"{{json variables}}"}
                    </span>{" "}
                    to reference JSON variables.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* BODY FIELD based on the method */}
            {showBody && (
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Body</FormLabel>
                    <InputGroup>
                      <InputGroupAddon
                        align={"block-start"}
                        className="border-b justify-end"
                      >
                        {/* Language or format indicator */}
                        <div className="text-xs flex items-center gap-1 text-muted-foreground">
                          <FileJsonIcon className="size-4" />
                          <span className="font-mono">json</span>
                        </div>
                      </InputGroupAddon>
                      <InputGroupAddon align="block-end">
                        <InputGroupButton
                          variant="ghost"
                          size="icon-xs"
                          onClick={() => {
                            navigator.clipboard.writeText(field.value || "")
                            toast.success("Copied to clipboard")
                          }}
                        >
                          <CopyIcon />
                        </InputGroupButton>
                        <InputGroupButton variant="ghost" size="icon-xs">
                          <TextWrapIcon />
                        </InputGroupButton>
                      </InputGroupAddon>
                      <FormControl>
                        <InputGroupTextarea
                          data-slot="input-group-control"
                          {...field}
                          placeholder={`{\n\t  "userId": "{{data.user.id}}",\n\t  "query": "{{data.input.query}}",\n\t  "limit": "{{data.input.limit}}"\n}`}
                          className="w-full min-h-[120px] font-mono
                          placeholder:text-muted-foreground placeholder:font-mono
                          text-sm"
                        />
                      </FormControl>
                    </InputGroup>
                    <FormDescription>
                      Enter the JSON body for your request. Use{" "}
                      {"{{variables}}"}
                      for dynamic values.
                    </FormDescription>
                  </FormItem>
                )}
              />
            )}
            <DialogFooter>
              <Button type="submit" className="mt-4">
                Send Request
                <SendHorizonalIcon className="size-4" />
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
