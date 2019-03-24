$(function() {
  $('#update-score').click(function() {
    const scoreA = $('#score-a').val()
    const scoreB = $('#score-b').val()
    const notify = $('#score-notify:checked').val()

    $.post(
      '/admin/match/0/score',
      {
        scoreA,
        scoreB,
        notify,
      },
      function(data) {
        console.log(data)
      }
    )

    return false
  })
})
