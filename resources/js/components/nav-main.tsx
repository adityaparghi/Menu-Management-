import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible';
import { ChevronRight, Trash2 } from 'lucide-react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <Collapsible
                        key={item.title}
                        asChild
                        defaultOpen={item.isActive}
                        className="group/collapsible"
                    >
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                                <SidebarMenuButton tooltip={item.title} className='cursor-pointer'>
                                    {item.icon && <item.icon />} {/*Icon render*/}
                                    {/* <span>{item.title}</span>   */}

                                    <span>{item.title}</span>

                                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <SidebarMenuSub>
                                    {item.items?.map((subItem) => (
                                        <SidebarMenuSubItem key={subItem.title}>
                                            <SidebarMenuSubButton asChild>
                                                {/* <Link href={subItem.href} className="flex items-center gap-2 hover:underline">
                                                    {subItem.icon && <subItem.icon className="w-4 h-4" />}
                                                    <span>{subItem.title}</span>
                                                </Link> */}
                                                {/* Error i encountered differences between Link and Anchor tag */}
                                                <a href={subItem.href} className='flex items-center gap-2 hover:underline cusor-pointer' >
                                                    {subItem.icon && <subItem.icon className="w-4 h-4" />}
                                                    <span>{subItem.title}</span>
                                                </a>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    ))}
                                </SidebarMenuSub>
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </Collapsible>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}


// after collapsible ends
// <SidebarMenuItem key={item.title}>
//     <SidebarMenuButton
//         asChild
//         isActive={page.url.startsWith(typeof item.href === 'string' ? item.href : item.href.url)}
//         tooltip={{ children: item.title }}
//     >
//         <Link href={item.href} prefetch>
//             {item.icon && <item.icon />}
//             <span>{item.title}</span>
//         </Link>
//     </SidebarMenuButton>
//</SidebarMenuItem>