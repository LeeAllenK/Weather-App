
export function DefaultCard({ defaultData ,name}) {


	return (
		<div className='defaultCard'>
			<section className='Default'>
				<h1>{name}:{defaultData}</h1>
			</section>
		</div>
	)
}