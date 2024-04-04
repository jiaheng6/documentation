import React from 'react'
import {Box, Octicon, Avatar, Text, Tooltip} from '@primer/react'
import {PencilIcon} from '@primer/octicons-react'
import Link from './link'
import usePage from '../hooks/use-page'

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const format = d => `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`

const pluralize = (word, count) => `${word}${count === 1 ? '' : 's'}`

const Contributors = ({contributors = [], latestCommit}) => {
  if (!contributors.length) {
    return null
  }

  return (
    <>
      <Box sx={{display: 'flex', alignItems: 'center'}}>
        <Text sx={{mr: 2}}>
          {contributors.length} {pluralize('contributor', contributors.length)}
        </Text>
        {contributors.map(login => (
          <Tooltip key={login} aria-label={login}>
            <Link href={`https://github.com/${login}`} sx={{lineHeight: 'condensedUltra', mr: 2}}>
              <Avatar src={`https://github.com/${login}.png?size=40`} alt={login} />
            </Link>
          </Tooltip>
        ))}
      </Box>
      {latestCommit ? (
        <Text sx={{fontSize: 1, color: 'fg.muted', mt: 1}}>
          Last edited by <Link href={`https://github.com/${latestCommit.login}`}>{latestCommit.login}</Link> on{' '}
          <Link href={latestCommit.url}>{format(new Date(latestCommit.date))}</Link>
        </Text>
      ) : null}
    </>
  )
}

const PageFooter = () => {
  const {editUrl, latestCommit, contributors = []} = usePage().pageContext

  if (!editUrl && !contributors.length) {
    return null
  }

  return (
    <Box
      sx={{
        borderWidth: 0,
        borderTopWidth: 1,
        borderRadius: 0,
        mt: 8,
        py: 5,
        borderStyle: 'solid',
        borderColor: 'border.default',
      }}
    >
      <Box sx={{display: 'grid', gap: 4}}>
        {editUrl ? (
          <Link href={editUrl}>
            <Octicon icon={PencilIcon} sx={{mr: 2}} />
            Edit this page on GitHub
          </Link>
        ) : null}
        <Contributors contributors={contributors} latestCommit={latestCommit} />
      </Box>
    <Box sx={{
        borderWidth: 0,
        borderTopWidth: 1,
        borderRadius: 0,
        mt: 8,
        py: 5,
        borderStyle: 'solid',
        borderColor: 'border.default',
        fontWeight: 'bold',
    }}>
        <Text sx={{fontSize: 1, color: 'fg.muted', mt: 1}}>声明：npm 及相关 logo 的版权归 npmjs.com 所有。本站点仅用于 npm 中文文档，与 npmjs.com 没有任何关系。由于译者水平有限，且避免产生误解，条款和政策内容不进行翻译，关于这部分，请移步官网查看最新内容。</Text>
    </Box>
    </Box>
  )
}

export default PageFooter
