"use client";

import { redirect } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { ContentLayout } from '@/components/custom/content-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/use-auth';
import { zodResolver } from '@hookform/resolvers/zod';

const pollFormSchema = z.object({
  question: z.string().min(1, "Question is required"),
  options: z
    .array(
      z.object({
        text: z.string().min(1, "Option text is required"),
        isCorrect: z.boolean().default(false),
      })
    )
    .refine((options) => {
      const correctOptions = options.filter((option) => option.isCorrect);
      return correctOptions.length === 1;
    }, "Please select exactly one correct option"),
});

type PollFormValues = z.infer<typeof pollFormSchema>;

const defaultValues: PollFormValues = {
  question: "",
  options: [
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
  ],
};

function StudentView() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Collaboration Portal
          </h1>
          <p className="text-muted-foreground">
            View and participate in polls from your faculty
          </p>
        </div>
      </div>
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">
            No active polls available
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function FacultyView() {
  const form = useForm<PollFormValues>({
    resolver: zodResolver(pollFormSchema),
    defaultValues,
  });

  function onSubmit(data: PollFormValues) {
    console.log(data);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Collaboration Portal
          </h1>
          <p className="text-muted-foreground">
            Create polls for your students
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create New Poll</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem className="space-y-0.5">
                    <FormLabel>Question</FormLabel>
                    <div className="h-[52px]">
                      <FormControl>
                        <Input
                          placeholder="Enter your question here"
                          {...field}
                        />
                      </FormControl>
                      <div className="h-3 mt-0.5">
                        <FormMessage className="text-xs" />
                      </div>
                    </div>
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <h3 className="font-medium">Options</h3>
                {form.watch("options").map((_, index) => (
                  <div key={index} className="grid grid-cols-[auto,1fr] gap-4">
                    <FormField
                      control={form.control}
                      name={`options.${index}.isCorrect`}
                      render={({ field }) => (
                        <FormItem className="flex h-[52px] items-center justify-center">
                          <FormControl>
                            <div className="h-6 w-6 flex items-center justify-center">
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={(checked) => {
                                  form.setValue(
                                    "options",
                                    form
                                      .getValues("options")
                                      .map((option, i) => ({
                                        ...option,
                                        isCorrect:
                                          i === index ? !!checked : false,
                                      }))
                                  );
                                }}
                              />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`options.${index}.text`}
                      render={({ field }) => (
                        <FormItem className="space-y-0.5">
                          <div className="h-[52px]">
                            <FormControl>
                              <Input
                                placeholder={`Option ${index + 1}`}
                                {...field}
                              />
                            </FormControl>
                            <div className="h-3 mt-0.5">
                              <FormMessage className="text-xs" />
                            </div>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
              </div>

              <Button type="submit">Create Poll</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function CollabPage() {
  const user = useAuth((state) => state.user);

  if (!user) {
    redirect("/");
  }

  return (
    <ContentLayout title="Collab Portal">
      {user.userType === "faculty" ? <FacultyView /> : <StudentView />}
    </ContentLayout>
  );
}
