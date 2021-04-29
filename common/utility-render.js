// The framework is thinked to develop PWA's and handle the server side rendering using the client implementation directly
// So, usually, the client app will mount into body, and for server side, the framework built a fake document environment 
// to mount the app and get the app rendered content as string
// Think of this as the main entry point for the client side app but used in server side for render
const render = (Vnode) => v.mount('body', () => Vnode);

export default render;