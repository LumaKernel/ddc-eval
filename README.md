# ddc-eval

[![Doc](https://img.shields.io/badge/doc-%3Ah%20ddc--eval-orange.svg?style=flat-square)](doc/ddc-eval.txt)

Vim script eval completion for ddc.vim

## Required

- [denops.vim](https://github.com/vim-denops/denops.vim)
- [ddc.vim](https://github.com/Shougo/ddc.vim)

## Recipes

```vim
let g:ddc_pick_items = []

function! s:pick(word)
  call add(g:ddc_pick_items, { 'word': a:word })
  if len(g:ddc_pick_items) > 100
    let g:ddc_pick_items = g:ddc_pick_items[:-2]
  endif
endfunction

call ddc#custom#alias('source', 'pick', 'list')
call ddc#custom#patch_global('sources', ['pick'])
call ddc#custom#patch_global('sourceOptions', {
    \ 'pick': {
    \   'mark': 'P',
    \   'isVolatile': v:true,
    \ }})
call ddc#custom#patch_global('sourceParams', {
    \ 'pick': {
    \   'expr': 'g:ddc_pick_items',
    \ }})
nnoremap <silent> * :<c-u>call <sid>pick(expand('<cword>'))<cr>*
```
