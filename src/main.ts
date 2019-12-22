import { Promise } from './promise';

new Promise<string>((resolve, reject) => {
  resolve('A');
  reject('A');
})
  .then(data => console.log('then:data', data))
  .then(
    data => console.log('then:data', data),
    reason => console.log('then:reason', reason),
  )
  .catch(reason => console.log('catch:reason', reason));
