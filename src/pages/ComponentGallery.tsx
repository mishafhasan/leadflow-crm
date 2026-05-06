import React, { useState } from 'react';
import { TrendingUp, Users, DollarSign, Target } from 'lucide-react';

// ─── shadcn/ui components (named exports) ───────────────────────────────────
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Calendar } from '@/components/ui/calendar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Toggle } from '@/components/ui/toggle';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@/components/ui/input-otp';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';

// ─── Custom UI Components (default exports) ──────────────────────────────────
import ActionButton from '@/components/ui/ActionButton';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import GlassCard from '@/components/ui/GlassCard';
import EmptyState from '@/components/ui/EmptyState';
import InfoCard from '@/components/ui/InfoCard';
import StatusBadge from '@/components/ui/StatusBadge';
import Spinner from '@/components/ui/Spinner';
import ShimmerButton from '@/components/ui/ShimmerButton';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Modal from '@/components/ui/Modal';

// ─── Dashboard Components (default exports) ─────────────────────────────────
import PipelineBar from '@/components/dashboard/PipelineBar';
import StatCard from '@/components/dashboard/StatCard';

// ─── Leads Components (default exports) ─────────────────────────────────────
import StatusSelect from '@/components/leads/StatusSelect';
import LeadFormModal from '@/components/leads/LeadFormModal';


// ─── Helper: section wrapper ─────────────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold border-b pb-2">{title}</h2>
      {children}
    </section>
  );
}

function Showcase({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4 p-6 border rounded-xl bg-white dark:bg-zinc-900 shadow-sm">
      <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">{title}</h3>
      {children}
    </div>
  );
}

// ─── Component Gallery ───────────────────────────────────────────────────────
const ComponentGallery = () => {
  const [statusSelectVal, setStatusSelectVal] = useState('New');
  const [modalOpen, setModalOpen] = useState(false);
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [collapsibleOpen, setCollapsibleOpen] = useState(false);
  const [otpVal, setOtpVal] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 p-8 space-y-16">
      <header className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Component Gallery</h1>
        <p className="text-muted-foreground text-lg">
          A comprehensive overview of all components in the LeadFlow CRM codebase.
        </p>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 1 — Buttons & Actions
      ═══════════════════════════════════════════════════════════════════════ */}
      <Section title="Buttons & Actions">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Showcase title="shadcn Button">
            <div className="flex flex-wrap gap-2">
              <Button variant="default">Default</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
          </Showcase>

          <Showcase title="ActionButton">
            <div className="flex flex-wrap gap-2">
              <ActionButton variant="primary">Primary</ActionButton>
              <ActionButton variant="secondary">Secondary</ActionButton>
              <ActionButton variant="danger">Danger</ActionButton>
              <ActionButton variant="ghost">Ghost</ActionButton>
            </div>
          </Showcase>

          <Showcase title="ShimmerButton">
            <div className="flex flex-wrap gap-2">
              <ShimmerButton variant="primary">Primary Shimmer</ShimmerButton>
              <ShimmerButton variant="ghost">Ghost Shimmer</ShimmerButton>
              <ShimmerButton variant="outline">Outline Shimmer</ShimmerButton>
            </div>
          </Showcase>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 2 — Inputs & Forms
      ═══════════════════════════════════════════════════════════════════════ */}
      <Section title="Inputs & Forms">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Showcase title="Input">
            <div className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="demo-input">Default</Label>
                <Input id="demo-input" placeholder="Enter text..." />
              </div>
              <div className="space-y-1">
                <Label htmlFor="demo-input-disabled">Disabled</Label>
                <Input id="demo-input-disabled" placeholder="Disabled" disabled />
              </div>
            </div>
          </Showcase>

          <Showcase title="Textarea & Select">
            <div className="space-y-3">
              <div className="space-y-1">
                <Label>Textarea</Label>
                <Textarea placeholder="Enter long text..." />
              </div>
              <div className="space-y-1">
                <Label>Select</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option-1">Option 1</SelectItem>
                    <SelectItem value="option-2">Option 2</SelectItem>
                    <SelectItem value="option-3">Option 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Showcase>

          <Showcase title="Checkbox, Switch, Radio, Slider">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Checkbox id="cb1" />
                <Label htmlFor="cb1">Checkbox</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="sw1" />
                <Label htmlFor="sw1">Switch</Label>
              </div>
              <RadioGroup defaultValue="a">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="a" id="rg-a" />
                  <Label htmlFor="rg-a">Radio A</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="b" id="rg-b" />
                  <Label htmlFor="rg-b">Radio B</Label>
                </div>
              </RadioGroup>
              <div className="space-y-1">
                <Label>Slider</Label>
                <Slider defaultValue={[50]} max={100} step={1} />
              </div>
            </div>
          </Showcase>

          <Showcase title="Input OTP">
            <InputOTP maxLength={6} value={otpVal} onChange={setOtpVal}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </Showcase>

          <Showcase title="Calendar">
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
          </Showcase>

          <Showcase title="Toggle & ToggleGroup">
            <div className="space-y-3">
              <div className="flex gap-2">
                <Toggle>A</Toggle>
                <Toggle>B</Toggle>
                <Toggle>C</Toggle>
              </div>
              <ToggleGroup type="multiple">
                <ToggleGroupItem value="a">A</ToggleGroupItem>
                <ToggleGroupItem value="b">B</ToggleGroupItem>
                <ToggleGroupItem value="c">C</ToggleGroupItem>
              </ToggleGroup>
            </div>
          </Showcase>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 3 — Badges & Status
      ═══════════════════════════════════════════════════════════════════════ */}
      <Section title="Badges & Status">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Showcase title="Badge (shadcn)">
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
          </Showcase>

          <Showcase title="StatusBadge">
            <div className="flex flex-wrap gap-2">
              <StatusBadge text="Active" className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300" />
              <StatusBadge text="Pending" className="bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300" />
              <StatusBadge text="Closed" className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300" />
            </div>
          </Showcase>

          <Showcase title="Separator">
            <div className="space-y-2">
              <p>Item A</p>
              <Separator />
              <p>Item B</p>
            </div>
          </Showcase>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 4 — Cards & Containers
      ═══════════════════════════════════════════════════════════════════════ */}
      <Section title="Cards & Containers">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Showcase title="Card (shadcn)">
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card description goes here.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card content area.</p>
              </CardContent>
              <CardFooter>
                <Button size="sm">Action</Button>
              </CardFooter>
            </Card>
          </Showcase>

          <Showcase title="GlassCard">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-4">
              <GlassCard>
                <h4 className="font-bold text-white">Glass Card</h4>
                <p className="text-sm text-white/80">Frosted glass effect card.</p>
              </GlassCard>
            </div>
          </Showcase>

          <Showcase title="InfoCard">
            <InfoCard>
              <h4 className="font-bold">Info Card</h4>
              <p className="text-sm text-slate-500">A simple card container for displaying content.</p>
            </InfoCard>
          </Showcase>

          <Showcase title="AspectRatio">
            <AspectRatio ratio={16 / 9} className="bg-muted rounded-md flex items-center justify-center">
              <span className="text-muted-foreground text-sm">16:9 Aspect Ratio</span>
            </AspectRatio>
          </Showcase>

          <Showcase title="Collapsible">
            <Collapsible open={collapsibleOpen} onOpenChange={setCollapsibleOpen}>
              <div className="flex items-center gap-2">
                <Label>Collapsible</Label>
                <CollapsibleTrigger asChild>
                  <Button variant="outline" size="sm">
                    {collapsibleOpen ? 'Close' : 'Open'}
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent className="mt-2 p-2 border rounded-md bg-slate-50 dark:bg-slate-800">
                This content is collapsible!
              </CollapsibleContent>
            </Collapsible>
          </Showcase>

          <Showcase title="Resizable">
            <ResizablePanelGroup direction="horizontal" className="min-h-[100px] rounded-lg border">
              <ResizablePanel defaultSize={50}>
                <div className="flex h-full items-center justify-center p-4">
                  <span className="text-sm">Panel A</span>
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={50}>
                <div className="flex h-full items-center justify-center p-4">
                  <span className="text-sm">Panel B</span>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </Showcase>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 5 — Feedback & Loading
      ═══════════════════════════════════════════════════════════════════════ */}
      <Section title="Feedback & Loading">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Showcase title="Alert">
            <div className="space-y-3">
              <Alert>
                <AlertTitle>Default Alert</AlertTitle>
                <AlertDescription>This is a default alert message.</AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <AlertTitle>Error!</AlertTitle>
                <AlertDescription>Something went wrong.</AlertDescription>
              </Alert>
            </div>
          </Showcase>

          <Showcase title="Progress & Spinner">
            <div className="space-y-4">
              <div className="space-y-1">
                <Label>Progress (66%)</Label>
                <Progress value={66} className="w-full" />
              </div>
              <div className="flex items-center gap-4">
                <Spinner size="sm" />
                <Spinner size="md" />
                <Spinner size="lg" />
                <span className="text-sm text-muted-foreground">Spinner sizes</span>
              </div>
            </div>
          </Showcase>

          <Showcase title="Skeleton & EmptyState">
            <div className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-12 w-full" />
              </div>
              <Separator />
              <EmptyState title="No Data Found" description="We couldn't find any results." />
            </div>
          </Showcase>

          <Showcase title="AnimatedCounter">
            <div className="space-y-2">
              <p className="text-3xl font-bold">
                <AnimatedCounter target={1284} />
              </p>
              <p className="text-3xl font-bold">
                <AnimatedCounter target={99} prefix="$" suffix="K" />
              </p>
            </div>
          </Showcase>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 6 — Navigation & Menus
      ═══════════════════════════════════════════════════════════════════════ */}
      <Section title="Navigation & Menus">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Showcase title="Tabs">
            <Tabs defaultValue="account">
              <TabsList>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="password">Password</TabsTrigger>
              </TabsList>
              <TabsContent value="account">Account settings content.</TabsContent>
              <TabsContent value="password">Password settings content.</TabsContent>
            </Tabs>
          </Showcase>

          <Showcase title="Accordion">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>Yes. It uses Tailwind CSS for styling.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </Showcase>

          <Showcase title="DropdownMenu">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Open Menu</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Showcase>

          <Showcase title="Breadcrumb">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Components</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </Showcase>

          <Showcase title="Pagination">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </Showcase>

          <Showcase title="HoverCard">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="link">@leadflow</Button>
              </HoverCardTrigger>
              <HoverCardContent>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">@leadflow</h4>
                  <p className="text-sm text-muted-foreground">The CRM platform for modern teams.</p>
                </div>
              </HoverCardContent>
            </HoverCard>
          </Showcase>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 7 — Overlays & Dialogs
      ═══════════════════════════════════════════════════════════════════════ */}
      <Section title="Overlays & Dialogs">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Showcase title="Dialog">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Open Dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                  <DialogDescription>This action cannot be undone.</DialogDescription>
                </DialogHeader>
                <div className="py-4">Dialog content area.</div>
                <DialogFooter>
                  <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
                  <Button>Confirm</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </Showcase>

          <Showcase title="AlertDialog">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete Account</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Showcase>

          <Showcase title="Sheet">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Open Sheet</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Sheet Title</SheetTitle>
                  <SheetDescription>Sheet description goes here.</SheetDescription>
                </SheetHeader>
                <div className="py-4">Sheet content area.</div>
              </SheetContent>
            </Sheet>
          </Showcase>

          <Showcase title="Drawer">
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline">Open Drawer</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Drawer Title</DrawerTitle>
                  <DrawerDescription>Drawer description.</DrawerDescription>
                </DrawerHeader>
                <div className="p-4">Drawer content area.</div>
                <DrawerFooter>
                  <Button>Submit</Button>
                  <DrawerClose asChild><Button variant="outline">Cancel</Button></DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </Showcase>

          <Showcase title="Popover">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Open Popover</Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="space-y-2">
                  <h4 className="font-medium">Popover</h4>
                  <p className="text-sm text-muted-foreground">Popover content here.</p>
                </div>
              </PopoverContent>
            </Popover>
          </Showcase>

          <Showcase title="Tooltip">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Hover me</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Tooltip message</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Showcase>

          <Showcase title="Modal (Custom)">
            <Button variant="outline" onClick={() => setModalOpen(true)}>Open Modal</Button>
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Custom Modal">
              <p>This is a custom modal component.</p>
            </Modal>
          </Showcase>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 8 — Data Display
      ═══════════════════════════════════════════════════════════════════════ */}
      <Section title="Data Display">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Showcase title="Avatar">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>AB</AvatarFallback>
              </Avatar>
            </div>
          </Showcase>

          <Showcase title="Table">
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>John Doe</TableCell>
                    <TableCell><Badge>Active</Badge></TableCell>
                    <TableCell className="text-right">$25,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Jane Smith</TableCell>
                    <TableCell><Badge variant="secondary">Pending</Badge></TableCell>
                    <TableCell className="text-right">$18,500</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Bob Wilson</TableCell>
                    <TableCell><Badge variant="destructive">Lost</Badge></TableCell>
                    <TableCell className="text-right">$0</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </Showcase>

          <Showcase title="ScrollArea">
            <ScrollArea className="h-28 w-full border rounded-md p-2">
              <div className="space-y-2">
                <p>Line 1 of scroll area</p>
                <p>Line 2 of scroll area</p>
                <p>Line 3 of scroll area</p>
                <p>Line 4 of scroll area</p>
                <p>Line 5 of scroll area</p>
                <p>Line 6 of scroll area</p>
                <p>Line 7 of scroll area</p>
                <p>Line 8 of scroll area</p>
              </div>
            </ScrollArea>
          </Showcase>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 9 — Domain-Specific Components
      ═══════════════════════════════════════════════════════════════════════ */}
      <Section title="Domain-Specific Components">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Showcase title="StatCard (Dashboard)">
            <div className="grid grid-cols-2 gap-4">
              <StatCard label="Total Leads" value={1284} icon={Users} iconColor="text-indigo-600" iconBg="bg-indigo-100 dark:bg-indigo-900" />
              <StatCard label="Deal Value" value={840000} isCurrency icon={DollarSign} iconColor="text-emerald-600" iconBg="bg-emerald-100 dark:bg-emerald-900" />
              <StatCard label="Pipeline" value={56} icon={TrendingUp} iconColor="text-amber-600" iconBg="bg-amber-100 dark:bg-amber-900" />
              <StatCard label="Win Rate" value={42} icon={Target} iconColor="text-purple-600" iconBg="bg-purple-100 dark:bg-purple-900" />
            </div>
          </Showcase>

          <Showcase title="PipelineBar (Dashboard)">
            <PipelineBar
              pipeline={[
                { status: 'New', count: 142 },
                { status: 'Contacted', count: 89 },
                { status: 'Qualified', count: 56 },
                { status: 'Proposal Sent', count: 34 },
                { status: 'Won', count: 18 },
                { status: 'Lost', count: 7 },
              ]}
              total={346}
            />
          </Showcase>

          <Showcase title="StatusSelect (Leads)">
            <div className="space-y-2">
              <Label>Lead Status</Label>
              <StatusSelect value={statusSelectVal} onChange={setStatusSelectVal} size="md" />
            </div>
          </Showcase>

          <Showcase title="LeadFormModal (Leads)">
            <Button variant="outline" onClick={() => setLeadModalOpen(true)}>Open Lead Form</Button>
            <LeadFormModal
              isOpen={leadModalOpen}
              onClose={() => setLeadModalOpen(false)}
              onSave={(data) => { console.log('Saved:', data); setLeadModalOpen(false); }}
            />
          </Showcase>
        </div>
      </Section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 11 — ScrollReveal
      ═══════════════════════════════════════════════════════════════════════ */}
      <Section title="ScrollReveal (Animation Wrapper)">
        <Showcase title="ScrollReveal">
          <div className="space-y-4">
            <ScrollReveal>
              <Card className="p-4">
                <p>This card fades in from below when scrolled into view.</p>
              </Card>
            </ScrollReveal>
            <ScrollReveal delay={0.2} direction="left">
              <Card className="p-4">
                <p>This card fades in from the left with a 0.2s delay.</p>
              </Card>
            </ScrollReveal>
          </div>
        </Showcase>
      </Section>
    </div>
  );
};

export default ComponentGallery;
