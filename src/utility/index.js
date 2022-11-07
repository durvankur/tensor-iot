export const getFilterUrl = (filter) => {
  if (filter === 'Failed Launches') {
    return `&launch_success=false`
  } else if (filter === 'Successful Launches') {
    return `&launch_success=true`
  }
  return ''
}