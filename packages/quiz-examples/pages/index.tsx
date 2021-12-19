import type { NextPage } from 'next'
import Qcm, {
  Questionnaire,
  QuestionnairePages,
  QcmAnswer,
  ValidQcmAnswer,
} from '@meknes/meknes-components'

const Home: NextPage = () => {
  return (
    <>
      <p>index page</p>

      <Questionnaire>
        <QuestionnairePages>
          <Qcm>
            <p>This is my question</p>
            <QcmAnswer idResponse={1}>First answer</QcmAnswer>
            <QcmAnswer idResponse={2}>Second answer</QcmAnswer>
            <QcmAnswer idResponse={3} isValid>
              Third answer
            </QcmAnswer>
            <QcmAnswer idResponse={4}>Fourth answer</QcmAnswer>

            <ValidQcmAnswer>Validate answer</ValidQcmAnswer>
          </Qcm>
        </QuestionnairePages>
      </Questionnaire>
    </>
  )
}

export default Home
