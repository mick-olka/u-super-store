import Delivery from "@/app/[lang]/assets/images/delivery.jpg";
import Payment from "@/app/[lang]/assets/images/payment.svg";
import ProductExample from "@/app/[lang]/assets/images/pc-display-1.png";
import { globalConfig } from "@/shared/configs/global";
import Image from "next/image";

export default function AboutPage() {
	return (
		<div className="py-16 w-full">
			{/* <h2 className="text-center text-2xl font-bold">In development</h2> */}
			<div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
				<div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12 mb-12">
					<div className="md:5/12 lg:w-5/12">
						<Image
							alt="PC"
							src={ProductExample}
							width={460}
							height={460}
							className="ml-auto"
						/>
					</div>
					<div className="md:7/12 lg:w-6/12">
						<h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
							Чому варто обрати наш магазин для покупки меблів для своєї оселі
							чи бізнесу?
						</h2>
						<p className="mt-6 text-gray-600 leading-10">
							У {globalConfig.shopLabel} ми любимо меблі та створюємо ідеальні
							меблі для ваших потреб. Незалежно від того, чи ви досвідчений
							меблевий дизайнер, творчий професіонал, чи просто шукаєте надійний
							меблі, ми пропонуємо найкращий вибір та обслуговування, щоб ви
							отримали саме те, що шукаєте. Ось чому ми повинні бути вашим
							універсальним магазином для всього, що стосується меблів!
						</p>
						<p className="mt-4 text-gray-600">
							Готові зробити оселю своєї мрії? Перегляньте наші товари вже
							сьогодні!
						</p>
					</div>
				</div>
				<div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
					<div className="md:5/12 lg:w-5/12">
						<Image
							alt="PC"
							src={Delivery}
							width={460}
							height={460}
							className="ml-auto"
						/>
					</div>
					<div className="md:7/12 lg:w-6/12">
						<h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
							Швидка та надійна доставка
						</h2>
						<p className="mt-6 text-gray-600 leading-10">
							Доставка товарів здійснюється за допомогою сервісів Нової Пошти.
							Отримати своє замовлення ви можете в будь-якому місті України. При
							оформленні замовлення ви бачите повну суму, яку витратите на
							доставку. Послуга післяплати в нашому магазині - безкоштовна.
							Практично всі товари є на складі в момент оформлення замовлення,
							тому більше 80% замовлень відправляються протягом доби.
						</p>
						<p className="mt-4 text-red-600">
							Важливо! Обов&apos;язково перевірте цілісність, стан і зовнішній
							вигляд товару до підписання товарно-транспортної накладної та
							здійснення оплати. За збереження замовлених вами товарів під час
							доставки несуть відповідальність кур&apos;єри і служба доставки.
						</p>
					</div>
				</div>

				<div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
					<div className="md:5/12 lg:w-5/12">
						<Image
							alt="PC"
							src={Payment}
							width={460}
							height={460}
							className="ml-auto"
						/>
					</div>
					<div className="md:7/12 lg:w-6/12">
						<h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
							Зручна та безпечна оплата
						</h2>
						<p className="mt-6 text-gray-600 leading-10">
							Сплачуйте товар одразу після узгодження замовлення з менеджером
							{` ${globalConfig.shopLabel}`}. Ви можете отримати замовлення,
							сплачене на поточний рахунок (п/р) при наявності документа, що
							посвідчує особу одержувача. Отримати товар має саме та особа, чиї
							дані були вказані при оформленні замовлення.
						</p>
						<p className="mt-6 text-gray-600 leading-10">
							Шановні клієнти! З вашого боку потрібна передоплата лише у 2-х
							випадках: <br /> - При замовленні на суму від 100 000 грн. з
							доставкою Новою поштою або Укрпоштою. У цьому разі передоплата
							становить 10%. Інші 90% можна виплатити на відділенні пошти після
							отримання товару. <br /> - При замовленні послуги збірки ПК.
							Передоплата становить 20%.
						</p>
						<p className="mt-4 text-red-600">
							Зверніть увагу, що при сплаті за реквізитами банк може брати
							комісію у різному розмірі (залежить від суми платежу). Комісії за
							накладений платіж немає
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
