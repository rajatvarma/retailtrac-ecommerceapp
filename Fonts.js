import {useFonts, FrankRuhlLibre_300Light, FrankRuhlLibre_700Bold, FrankRuhlLibre_400Regular, FrankRuhlLibre_900Black, Fresca_400Regular, ArimaMadurai_100Thin, UnifrakturMaguntia_400Regular} from '@expo-google-fonts/dev'

const FontComponent = () => {
    let [fontsLoaded] = [useFonts({FrankRuhlLibre_300Light, FrankRuhlLibre_400Regular, FrankRuhlLibre_700Bold, FrankRuhlLibre_900Black, UnifrakturMaguntia_400Regular})];
    return fontsLoaded
}

export default FontComponent