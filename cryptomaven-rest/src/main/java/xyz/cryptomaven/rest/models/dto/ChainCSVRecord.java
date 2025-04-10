package xyz.cryptomaven.rest.models.dto;

import com.opencsv.bean.CsvBindByName;
import jakarta.persistence.Column;
import lombok.*;

/**
*
 */

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor(force = true)
public class ChainCSVRecord {

    @CsvBindByName
    private Integer row;

    @CsvBindByName(column = "count.x")
    private Integer version;

    @CsvBindByName
    private String name;

    @CsvBindByName
    private  String symbol;

    @CsvBindByName
    private String description;

    @CsvBindByName
    private String longDescription;

    @CsvBindByName
    private String iconUrl;

    @CsvBindByName(column = "chain_list_icon")
    private String chainListIcon;

    @CsvBindByName(column = "rpc_url")
    private String rpcUrl;

    @CsvBindByName
    private Integer id;

    @CsvBindByName(column = "block_explorer_url")
    private String blockExplorerUrl;


    @CsvBindByName
    private Float price;

    @CsvBindByName(column = "count.y")
    private String count_y;

    @CsvBindByName
    private String label;

}
