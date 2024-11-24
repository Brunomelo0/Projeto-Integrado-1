import { ThemeProvider }  from 'styled-components';

import GlobalStyles from '../../assets/styles/global';
import defaultTheme from '../../assets/styles/themes/default';

import StudentsList from '../StudentsList';
import Header from '../Header';

import { Container } from './styles';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
    <GlobalStyles/>
    <Container>
      <Header/>
      <StudentsList/>
    </Container>
    </ThemeProvider>
  )
}

export default App
