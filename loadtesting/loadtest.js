/*
  Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
  Permission is hereby granted, free of charge, to any person obtaining a copy of this
  software and associated documentation files (the "Software"), to deal in the Software
  without restriction, including without limitation the rights to use, copy, modify,
  merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
  permit persons to whom the Software is furnished to do so.
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
  INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
  PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
  OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

'use strict'
const bounds = {
  lenMax: 1000,
  lenMin: 1,
  widMax: 1000,
  widMin: 1
}

const words = "This is test data "

const generateRandomData = (userContext, events, done) => {
  const randomLen = ((bounds.lenMax-bounds.lenMin) * Math.random()) + bounds.lenMin
  const randomWid = ((bounds.widMax-bounds.widMin) * Math.random()) + bounds.widMin

  const id = parseInt(Math.random()*1000)+5  //random 0-1000000
  
  userContext.vars.len = randomLen.toFixed(7)
  userContext.vars.wid = randomWid.toFixed(7)
  userContext.vars.name = words.repeat (500)
  userContext.vars.id = id
  
  return done()
}

module.exports = {
  generateRandomData
}
