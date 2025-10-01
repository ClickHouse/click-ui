import React from "react";
import { useCUITheme } from "@/theme/ClickUIProvider";
import { Button } from "@/components/Button/Button";
import styles from "./ThemeToggle.module.scss";

export const ThemeToggle: React.FC = () => {
  const { themeName, updateTheme } = useCUITheme();

  const handleThemeChange = () => {
    const nextTheme = themeName === "light" ? "dark" : "light";
    updateTheme(nextTheme);
  };

  return (
    <div className={styles.cuiThemeToggleContainer}>
      <span className={styles.cuiThemeLabel}>Current theme: {themeName}</span>
      <Button
        onClick={handleThemeChange}
        type="secondary"
      >
        Switch to {themeName === "light" ? "Dark" : "Light"}
      </Button>
    </div>
  );
};

export default ThemeToggle;
