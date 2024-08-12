const copyText = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert('이메일이 복사되었습니다!');
    })
    .catch(() => {
      alert('이메일 복사에 실패하였습니다!');
    });
};

export default copyText;
