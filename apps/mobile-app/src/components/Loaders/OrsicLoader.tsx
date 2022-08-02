import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export default function OrsicLoader() {
  return (
    <>
      {/* <SkeletonContent
        isLoading
        boneColor={Tailwind.gray[400]}
        highlightColor={Tailwind.gray[700]}
        animationType="shiver"
        containerStyle={{
          flex: 0.2,
          padding: RFValue(5),
        }}
        layout={[
          {
            flexDirection: "row",
            children: [
              {
                width: 40,
                height: 40,
                borderRadius: 20,
                marginRight: 10,
              },
              {
                flexDirection: "column",
                justifyContent: "space-around",
                children: [
                  {
                    width: 100,
                    height: 20,
                  },
                  {
                    width: 100,
                    height: 10,
                  },
                ],
              },
            ],
          },
        ]}
      ></SkeletonContent> */}
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    </>
  );
}
