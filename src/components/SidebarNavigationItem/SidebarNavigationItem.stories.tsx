import { Icon, SidebarNavigationItem } from "@/components";

export default {
  component: SidebarNavigationItem,
  title: "Display/SidebarNavigation/SidebarNavigationItem",
  tags: ["sidebar", "navigation-item", "autodocs"],
};

export const Default = {
  args: {
    children: (
      <a href="#">
        <Icon
          name="user"
          size="small"
        />{" "}
        Profile
      </a>
    ),
  },
};
