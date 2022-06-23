interface LayoutProps {
	children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<div className='layout'>
			{children}
			<style jsx>
				{`
					.layout {
						width: 80%;
						margin: 0 auto;
					}
				`}
			</style>
		</div>
	);
};

export default Layout;
