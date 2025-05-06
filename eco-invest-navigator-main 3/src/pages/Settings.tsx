import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Bell, 
  Check, 
  ClipboardList, 
  Database, 
  DollarSign, 
  Globe2, 
  Languages, 
  Lock, 
  Shield, 
  SlidersHorizontal, 
  User
} from 'lucide-react';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from "sonner";

const settingsSchema = z.object({
  maxThreshold: z.coerce
    .number()
    .min(1000, { message: 'Threshold must be at least ₹1,000' })
    .max(10000000, { message: 'Threshold cannot exceed ₹1 crore' }),
  autoInvestEnabled: z.boolean(),
  notificationsEnabled: z.boolean(),
  dataRefreshInterval: z.coerce.number().min(5).max(60),
  language: z.string(),
  currency: z.string()
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

export default function Settings() {
  const defaultValues: SettingsFormValues = {
    maxThreshold: 100000,
    autoInvestEnabled: false,
    notificationsEnabled: true,
    dataRefreshInterval: 15,
    language: 'english',
    currency: 'INR'
  };

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues
  });

  const onSubmit = (data: SettingsFormValues) => {
    // Save settings to database (in a real app)
    console.log('Settings saved:', data);

    // Show success toast
    toast.success("Settings updated", {
      description: "Your preferences have been saved successfully."
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and system settings</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <SlidersHorizontal className="h-5 w-5 text-ecofinex-primary" />
              <h2 className="text-lg font-semibold">Investment Preferences</h2>
            </div>

            <div className="space-y-6">
              <FormField
                control={form.control}
                name="maxThreshold"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Investment Threshold (₹)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                        <Input
                          type="number"
                          className="pl-10"
                          placeholder="Enter maximum threshold"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Set the maximum amount for auto-investment decisions
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="autoInvestEnabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Auto-Invest</FormLabel>
                      <FormDescription>
                        Enable AI-powered automatic investment execution
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notificationsEnabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Investment Notifications</FormLabel>
                      <FormDescription>
                        Receive alerts for new investment opportunities
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dataRefreshInterval"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data Refresh Interval (minutes)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={5}
                        max={60}
                        placeholder="Enter refresh interval"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      How often to refresh ESG and sentiment data
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator className="my-6" />

            <div className="flex items-center gap-2 mb-6">
              <Globe2 className="h-5 w-5 text-ecofinex-primary" />
              <h2 className="text-lg font-semibold">Regional Settings</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interface Language</FormLabel>
                    <div className="relative">
                      <Languages className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 pl-10 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={field.value}
                        onChange={field.onChange}
                      >
                        <option value="english">English</option>
                        <option value="hindi">Hindi</option>
                        <option value="tamil">Tamil</option>
                        <option value="telugu">Telugu</option>
                        <option value="bengali">Bengali</option>
                      </select>
                    </div>
                    <FormDescription>
                      Select your preferred language
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display Currency</FormLabel>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 pl-10 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={field.value}
                        onChange={field.onChange}
                      >
                        <option value="INR">Indian Rupee (₹)</option>
                        <option value="USD">US Dollar ($)</option>
                        <option value="EUR">Euro (€)</option>
                        <option value="GBP">British Pound (£)</option>
                      </select>
                    </div>
                    <FormDescription>
                      Currency for displaying financial data
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator className="my-6" />

            <div className="flex justify-end">
              <Button 
                type="submit" 
                className="bg-ecofinex-primary hover:bg-ecofinex-primary/90"
              >
                <Check className="mr-2 h-4 w-4" />
                Save Settings
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="h-5 w-5 text-ecofinex-primary" />
              <h2 className="text-lg font-semibold">Data & Privacy</h2>
            </div>

            <div className="space-y-4">
              <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Data Collection</FormLabel>
                  <FormDescription>
                    Allow anonymous usage data collection to improve our services
                  </FormDescription>
                </div>
                <Switch defaultChecked={true} />
              </div>

              <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Third-party Data Integration</FormLabel>
                  <FormDescription>
                    Allow integration with third-party ESG providers
                  </FormDescription>
                </div>
                <Switch defaultChecked={true} />
              </div>

              <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Marketing Communications</FormLabel>
                  <FormDescription>
                    Receive updates about new features and sustainability insights
                  </FormDescription>
                </div>
                <Switch defaultChecked={false} />
              </div>
            </div>

            <Separator className="my-6" />

            <div className="flex items-center justify-between">
              <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                Request Data Export
              </Button>
              <Button variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                Delete Account
              </Button>
            </div>
          </Card>
        </form>
      </Form>
    </div>
  );
}
