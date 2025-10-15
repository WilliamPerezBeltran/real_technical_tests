import React from "react";
import { StyleSheet, View } from "react-native";

export default function App() {
  // Write your logic here...

  return <View style={styles.container}>{/* ..and components here :) */}</View>;
}

// You can also use class components if you like.
// Just remove above functional component and uncomment below class component:
// export default class App extends React.Component {
//   // Write your logic here ...
//   render() {
//     return (
//       <View style={styles.container}>
//         {/* ...and components here :) */}
//       </View>
//     );
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
