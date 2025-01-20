"use client";

import { useId, useState } from 'react';

import { LoginForm } from '@/components/auth/login-form';
import {
    Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent } from '@/components/ui/tabs';

export default function Home() {
  const id = useId();
  const [selectedValue, setSelectedValue] = useState("student");

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Campus Portal</CardTitle>
          <CardDescription>Login to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedValue} className="w-full">
            <div className="inline-flex w-full h-9 rounded-lg bg-input/50 p-0.5 mb-4">
              <RadioGroup
                value={selectedValue}
                onValueChange={(value: "student" | "faculty") =>
                  setSelectedValue(value)
                }
                className="group relative inline-grid w-full grid-cols-2 items-center gap-0 text-sm font-medium after:absolute after:inset-y-0 after:w-1/2 after:rounded-md after:bg-background after:shadow-sm after:shadow-black/5 after:transition-transform after:duration-300 after:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] data-[state=student]:after:translate-x-0 data-[state=faculty]:after:translate-x-full"
                data-state={selectedValue}
              >
                <label className="relative z-10 inline-flex h-full cursor-pointer select-none items-center justify-center whitespace-nowrap px-4 transition-colors group-data-[state=faculty]:text-muted-foreground/70">
                  Student
                  <RadioGroupItem
                    id={`${id}-1`}
                    value="student"
                    className="sr-only"
                  />
                </label>
                <label className="relative z-10 inline-flex h-full cursor-pointer select-none items-center justify-center whitespace-nowrap px-4 transition-colors group-data-[state=student]:text-muted-foreground/70">
                  Faculty
                  <RadioGroupItem
                    id={`${id}-2`}
                    value="faculty"
                    className="sr-only"
                  />
                </label>
              </RadioGroup>
            </div>

            <div className="relative">
              <TabsContent value="student">
                <LoginForm userType="student" />
              </TabsContent>

              <TabsContent value="faculty">
                <LoginForm userType="faculty" />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500">
            Forgot your password?{" "}
            <a href="#" className="text-primary hover:underline">
              Reset here
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
