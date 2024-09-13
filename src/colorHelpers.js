import chroma, { hex } from "chroma-js";

const levels = [50,100,200,300,400,500,600,700,800,900];

function generatePallet(starterPallet){
    let newPallet = {
        palletName:starterPallet.paletteName,
        id:starterPallet.id,
        emoji:starterPallet.emoji,
        colors:{}
    }

    for(let level of levels){
        newPallet.colors[level] = [];
    }

    for(let color of starterPallet.colors){
        let scale = generateScale(color.color,10).reverse();
        for(let i in scale){
            newPallet.colors[levels[i]].push({
                name:`${color.name} ${levels[i]}`,
                id:color.name.toLowerCase().replace(/ /g, "-"),
                hex:scale[i],
                rgb:chroma(scale[i]).css(),
                rgba:chroma(scale[i]).css().replace('rgb','rgba').replace(")",",1.0)")
            })
        }
    }

    return newPallet
}

function getRange(hexColor){
    const end = "#fff";
    return [
        chroma(hexColor)
            .darken(1.4)
            .hex(),
        hexColor,
        end
    ]
}

function generateScale(hexColor,numberOfColors){
    return chroma.scale(getRange(hexColor)).mode("lab").colors(numberOfColors);
}

export {generatePallet};