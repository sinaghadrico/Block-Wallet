import styled from "styled-components";
import type { TableHTMLAttributes } from "react";
interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
    color?: "blue" | "purpleLighter" | "green";
    columns: {
        [key: string]: {
            label: string;
            render?: (value: string, record: { [key: string]: string }) => JSX.Element;
        };
    };
    items: { [key: string]: any }[];
}

export function Table({ color = "blue", columns, items, ...restProps }: TableProps) {
    const CustomWrapperTable = styled.div`
        width: 100%;

        max-height: 350px;
        overflow-y: auto;

        ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }

        ::-webkit-scrollbar-track {
            box-shadow: inset 0 0 5px ${({ theme }) => theme.colors?.["secondary_10"]};
            border-radius: 8px;
        }

        ::-webkit-scrollbar-thumb {
            background: ${({ theme, color }) => theme.colors?.[color]};
            border-radius: 8px;
        }

        ::-webkit-scrollbar-thumb:hover {
            background: ${({ theme, color }) => theme.colors?.[color]};
        }
    `;

    const CustomTable = styled.table`
        width: 100%;
        border-collapse: separate;
        border-spacing: 0 1em;

        padding: 0px 8px;
    `;
    const CustomTableTr = styled.tr`
        th {
            @media (min-width: 760px) {
                font-weight: bold;
                color: ${({ theme }) => theme.colors?.["blue"]};
                font-size: ${({ theme }) => theme.fonts?.["lg"]?.["size"]};
                text-align: left;
            }
            @media (max-width: 760px) {
                display: none;
            }
        }
        td {
            text-align: left;
            padding: 12px;

            background: ${({ theme }) => theme.colors?.["secondary_10"]};

            @media (min-width: 760px) {
                margin: 0.5em 1em;
                :first-child {
                    border-radius: 16px 0 0 16px;
                }
                :last-child {
                    border-radius: 0 16px 16px 0;
                }
            }
            @media (max-width: 760px) {
                :first-child {
                    border-radius: 16px 16px 0 0;
                }
                :last-child {
                    border-radius: 0 0 16px 16px;
                }
                display: flex;
                justify-content: space-between;
                align-items: center;
                &:before {
                    content: attr(data-th) " ";
                    display: flex;
                    align-items: center;
                    font-weight: bold;
                    color: ${({ theme }) => theme.colors?.["blue"]};
                    font-size: ${({ theme }) => theme.fonts?.["lg"]?.["size"]};
                }
            }
        }
    `;
    return (
        <CustomWrapperTable color={color}>
            {items.length === 0 ? (
                <div className="text-center my-24">There is no transactions</div>
            ) : (
                <CustomTable>
                    <CustomTableTr>
                        {Object.keys(columns)?.map((column, columnIndex) => (
                            <th key={`${columns[column].label}-${columnIndex}`}>{columns[column].label}</th>
                        ))}
                    </CustomTableTr>
                    {items?.map((item, itemIndex) => (
                        <CustomTableTr key={itemIndex}>
                            {Object.keys(columns)?.map((column) => (
                                <td key={`${column}-${itemIndex}`} data-th={columns[column].label}>
                                    {columns[column].render ? columns[column].render(item[column], item) : item[column]}
                                </td>
                            ))}
                        </CustomTableTr>
                    ))}
                </CustomTable>
            )}
        </CustomWrapperTable>
    );
}
