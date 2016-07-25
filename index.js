function build(subject, verb, noun, ...adj) {
    let adjString = adj.length ? adj.join(', ') + ' ' : '';
    return `${subject} ${verb}ed the ${adjString}${noun}`;
}

console.log(build('Charlie', 'punch', 'clown', 'big', 'scary', 'dirty'));
console.log(build('Charlie', 'kick', 'spider', 'brown', 'ugly'));
console.log(build('Charlie', 'attack', 'cake'));