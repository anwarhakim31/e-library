export const ProfileName = (name: string) =>
  name?.split(" ").length > 1
    ? name.split(" ")[0].charAt(0) + name.split(" ")[1].charAt(0)
    : name[0].charAt(0);
