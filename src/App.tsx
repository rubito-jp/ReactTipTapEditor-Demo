//src\App.tsx
import {lazy, Suspense} from 'react'
import {ErrorBoundary, type FallbackProps} from 'react-error-boundary'
import {Route, Routes} from 'react-router' 
import { TestPage } from './pages/TestPage'
import LoadingComponent from './components/reuseComponent/LoadingComponent'
import { TestAuthPage } from './pages/TestAuthPage'
 

const HomePage = lazy(async () =>
	import('@/pages/HomePage').then(m => ({default: m.HomePage}))
)

function renderError({error}: FallbackProps) {
	return <LoadingComponent   />
}

export function App() {
	return (
		<ErrorBoundary fallbackRender={renderError}>
			<Suspense fallback={<LoadingComponent />}>
				<Routes>
					<Route element={<HomePage />} index={true} />
					<Route element={<TestPage />} path='/test' />
					<Route element={<TestAuthPage />} path='/test-auth' />
				</Routes>
			</Suspense>
		</ErrorBoundary>
	)
}
