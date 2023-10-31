/**
 * 
 * @param {Player[]} players 
 */
export default function getOwnedProperties(players) {
    const ownedPropertyArray = [];
    players.forEach(player => {
        player.properties.forEach(property => {
            ownedPropertyArray.push(property);
        }) 
    })
    return ownedPropertyArray;
}