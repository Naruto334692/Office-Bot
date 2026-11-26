import { Text, View } from "react-native";
import { useText } from "../../runtime/context.tsx";
import { type DisplayPrefs, useDisplay } from "../../theme/display.tsx";
import { type } from "../../theme/scale.ts";
import { useColors } from "../../theme/use-theme.ts";
import { ErrorLine, ListCard, SectionTitle, Segmented, Separator } from "../../ui/controls.tsx";

function Choice<K extends keyof DisplayPrefs>({
  title,
  field,
  options,
}: {
  title: string;
  field: K;
  options: { value: DisplayPrefs[K]; label: string }[];
}) {
  const colors = useColors(),
    display = useDisplay();
  return (
    <View style={{ paddingVertical: 12, paddingHorizontal: 14, gap: 8 }}>
      <Text style={[type.rowTitle, { color: colors.text }]}>{title}</Text>
      <Segmented
        options={options}
        value={display.prefs[field]}
        onChange={(value) => display.update({ [field]: value } as Partial<DisplayPrefs>)}
      />
    </View>
  );
}
/** 「通用」: language and appearance, like the computer; saved on this phone only. */
export function DisplaySettings() {
  const t = useText(),
    display = useDisplay();
  return (
    <>
      <SectionTitle title={t("generalSection")} />
      <ListCard>
        <Choice
          title={t("languageTitle")}
          field="language"
          options={[
            { value: "system", label: t("followSystem") },
            { value: "zh", label: t("langZh") },
            { value: "en", label: t("langEn") },
            { value: "ru", label: t("langRu") },
          ]}
        />
        <Separator />
        <Choice
          title={t("appearanceTitle")}
          field="appearance"
          options={[
            { value: "system", label: t("followSystem") },
            { value: "light", label: t("themeLight") },
            { value: "dark", label: t("themeDark") },
          ]}
        />
      </ListCard>
      {display.saveFailed && <ErrorLine text={t("displaySaveFailed")} />}
    </>
  );
}
