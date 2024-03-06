interface IArgs {
  name: string,
  data: object | string,
  type: 'request' | 'response' | 'catch'
}

const log = ({ name, data, type }: IArgs) => {
  if (type === 'request') {
    console.log(`%c [request] ${name}`, 'background: #222; color: #00FF00')
    console.log(data)
    console.log('%c ...................', 'background: #222; color: #00FF00')
  }
  if (type === 'response') {
    console.log(`%c [response] ${name}`, 'background: #222; color: #00FFFF')
    console.log(data)
    console.log('%c ...................', 'background: #222; color: #00FFFF')
  }
  if (type === 'catch') {
    console.log(`%c [catch] ${name}`, 'background: #222; color: #dc3545')
    console.log(data)
    console.log('%c ...................', 'background: #222; color: #dc3545')
  }
}

export default log
