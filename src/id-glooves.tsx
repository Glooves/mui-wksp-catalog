let iconPath
iconPath = "http://stage.glooves.net:8080/wp-content/uploads/2024/12/cropped-g_ico-32x32.gif"
iconPath = "images/glooves_icon.png"

// Intent here is to Generate this link in the html head block:
// <link rel="icon" type="image/png" href="images/glooves_icon.png" sizes: "32x32" />
const iconGlooves = { 
    type: "image/png", 
    href: iconPath,
    sizes: "32x32"
}

export const LoadGLogo = () => {
    return 
        <link rel="icon" {...iconGlooves} />
}