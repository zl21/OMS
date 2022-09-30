import { render as FooterRender } from './footer'
import { render as ContentRender } from './content'

/* const el = document.getElementById('app')

FooterRender(el)
ContentRender(el)
 */

import('app01/Header').then( res => {
  console.log('=====', res.render);
  const { render: HeaderRender } = res
  const el = document.getElementById('app')
  HeaderRender(el)
  FooterRender(el)
  ContentRender(el)
})
